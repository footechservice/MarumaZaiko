// ================================================================
// マルマ松本商店 在庫管理システム - Google Apps Script
// このコードをGoogle Apps Scriptに貼り付けてデプロイしてください
// ================================================================

const SHEET_NAME_PRODUCTS = "商品マスタ";
const SHEET_NAME_HISTORY  = "更新履歴";

function doGet(e) {
  return handleRequest(e);
}
function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const params = e.parameter || {};
  const postData = e.postData ? JSON.parse(e.postData.contents || "{}") : {};
  const action = params.action || postData.action;

  try {
    let result;
    if (action === "getProducts")      result = getProducts();
    else if (action === "saveProducts") result = saveProducts(postData.products);
    else if (action === "getHistory")   result = getHistory();
    else if (action === "addHistory")   result = addHistory(postData.entry);
    else result = { error: "unknown action: " + action };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function getProducts() {
  const sheet = getOrCreateSheet(SHEET_NAME_PRODUCTS,
    ["id","name","code","stock","minStock","expiry","price","img","memo","updatedAt"]);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { products: defaultProducts() };
  const headers = data[0];
  const products = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return { products };
}

function saveProducts(products) {
  const sheet = getOrCreateSheet(SHEET_NAME_PRODUCTS,
    ["id","name","code","stock","minStock","expiry","price","img","memo","updatedAt"]);
  const headers = ["id","name","code","stock","minStock","expiry","price","img","memo","updatedAt"];
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  if (products && products.length > 0) {
    const rows = products.map(p => headers.map(h => p[h] !== undefined ? p[h] : ""));
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  return { ok: true, count: products ? products.length : 0 };
}

function getHistory() {
  const sheet = getOrCreateSheet(SHEET_NAME_HISTORY, ["time","msg","device"]);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { history: [] };
  const headers = data[0];
  const history = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  }).reverse();
  return { history };
}

function addHistory(entry) {
  const sheet = getOrCreateSheet(SHEET_NAME_HISTORY, ["time","msg","device"]);
  sheet.appendRow([entry.time || new Date().toLocaleString("ja-JP"), entry.msg || "", entry.device || "不明"]);
  return { ok: true };
}

function defaultProducts() {
  return [
    { id:1, name:"ずわい蟹ほぐしめし", code:"MR-001", stock:8, minStock:10,
      expiry:"2025-12-31", price:980, img:"", memo:"", updatedAt:"" },
    { id:2, name:"ずわい蟹ほぐしめし（大）", code:"MR-002", stock:15, minStock:10,
      expiry:"2025-12-28", price:1480, img:"", memo:"", updatedAt:"" }
  ];
}
