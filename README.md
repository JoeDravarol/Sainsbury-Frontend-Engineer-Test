# Sainsbury's DTD | Front-end Engineer Test

## Prompt:

You are provided with an endpoint which delivers JSON-formatted product information including pricing for supermarket grocery items.

API: https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/sainsbury_products/products.json

Retrieve the product information from the endpoint and use it to build summary calculations for an input array of product ids.

The unique product identifier (the product_uid field) is provided as a String in the JSON product information

The price is provided as a float (It is the price field within the retail_price Object).

Your code should output the summary information as a single JSON String.

The fields in the output JSON should be:

- lines: array of line item objects as defined below.
- total_item_count: the number of valid product uids in the input array. This will be the same as the sum of all quantity fields in the lines array. This is an integer.
- total: the total retail price for all the valid products in the input array. This should be the same as the sum of all the subtotal fields in the lines array.

Line item object definition:

- uid: the product uid unique identifier. This is a String.
- quantity: the number of times the product uid was present in the input array. This is an integer.
- subtotal: the price of this quantity of this product. This is a float.

## NOTES

- If the product does not appear in the input array do NOT include it in the output i.e. all items in the lines array should have non-zero values for quantity.
- If there is an unmatched product uid in the input array, ignore it.

## INPUT

string[]: an array of product identifiers

## OUTPUT

string: in JSON format

## EXAMPLE

### Input

`["6447344", "6447344", "3052068", "3052068", "3052068"]`

### Output

```json
{
  "lines": [
    {
      "uid": "6447344",
      "quantity": 2,
      "subtotal": 7.5
    },
    {
      "uid": "3052068",
      "quantity": 3,
      "subtotal": 11.25
    }
  ],
  "total_ item_count": 5,
  "total": 18.75
}
```
