const API = "https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/sainsbury_products/products.json";

async function run(productUUIDs) {
  const response = await fetch(API);
  const groceryItems = await response.json();
  
  // Find products
  const productsInfo = groceryItems.filter(item => {
    return productUUIDs.includes(item.product_uid);
  });
  // Custom condense products info
  const condenseProductsInfo = productsInfo.map(product => {
  	return {
      uid: product.product_uid,
      retail_price: product.retail_price.price,
      quantity: getProductQuantity(product.product_uid, productUUIDs),
    }
  });
  
  // Produce summary
  const summary = {
    lines: [],
    total_item_count: productUUIDs.length,
    total: 0,
  };
  
  let totalRetailPrice = 0;
  
  condenseProductsInfo.forEach(product => {
    const productLine = {
      uid: product.uid,
      quantity: product.quantity,
      subtotal: product.quantity * product.retail_price,
    };
    
    totalRetailPrice += productLine.subtotal
    
  	summary.lines.push(productLine);
  });
  
  summary.total = totalRetailPrice;

  return JSON.stringify(summary);
}

// Note: It will be more optimal to get all quantity in one pass through
function getProductQuantity(uid, productUUIDs) {
  let quantity = 0;
  
  for (const UUID of productUUIDs) {
    if (UUID === uid) {
      quantity += 1;
    }
  }
  
  return quantity;
};

run(["6447344", "6447344", "3052068", "3052068", "3052068"]);
