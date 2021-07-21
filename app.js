const transactionFile = require("./inputFiles/transactions.json");
const stockFile = require("./inputFiles/stock.json");

const getTransactionStock = async (skuCode) => {
  const checkSKU = transactionFile.find(({ sku }) => sku === skuCode);
  if (checkSKU) {
    const responsetransactions = await transactionFile.find(
      ({ sku }) => sku === skuCode
    );
    const responseStockLevel = await stockFile.find(
      ({ sku }) => sku === skuCode
    );
    currentStockLevels(responsetransactions, responseStockLevel);
  } else {
    console.log("SKU does not exist");
  }
};

const currentStockLevels = (transaction, stockLevel) => {
  if (transaction.type == "order") {
    console.log(
      `SKU: ${transaction.sku}, Quantity: ${stockLevel.stock + transaction.qty}`
    );
  } else if (transaction.type == "refund") {
    console.log(stockLevel.stock - transaction.qty);
  } else {
    console.log("SKU does not exist");
  }
};

console.log(getTransactionStock("ELK743612/34/57"));
