import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: "Home",
      myRecords: "My Records",
      myStocks: "My Stocks",
      contactUs: "Contact Us",
      inputStockInfo: "Input Stock Information",
      form: {
        expenditure: "Expenditure",
        income: "Income",
        itemName: "Item Name",
        quantity: "Quantity",
        currency: "Currency",
        amount: "Amount",
        category: "Category",
        date: "Date",
        title: "Title",
        name: "Name",
        email: "Email",
        phone: "Phone Number",
        message: "Message",
        stockSymbol: "Stock Symbol",
        numOfShares: "Number of Shares",
        price: "Purchase Price",
        status: "Status",
        hold: "Hold",
        sold: "Sold",
        inputMessage: "Please input your message",
        submit: "Submit",
        reset: "Reset",
        optional: "optional",
        required: "This field is required",
        min1: "The input must be at least 1",
        positive: "The input must be positive",
        invalidEmail: "Invalid email",
        dateNotFuture: "Date cannot be in the future",
      }
    }
  },
  zh: {
    translation: {
      home: "首頁",
      myRecords: "我的記錄",
      myStocks: "我的股票",
      contactUs: "聯絡我們",
      inputStockInfo: "輸入股票資料",
      form: {
        expenditure: "支出",
        income: "收入",
        itemName: "項目名稱",
        quantity: "數量",
        currency: "貨幣",
        amount: "金額",
        category: "類別",
        date: "日期",
        title: "稱謂",
        name: "姓名",
        email: "電郵",
        phone: "電話號碼",
        message: "訊息",
        stockSymbol: "股票代號",
        numOfShares: "股票數量",
        price: "購買價格",
        status: "狀態",
        hold: "持有",
        sold: "已售",
        inputMessage: "請輸入您的訊息",
        submit: "提交",
        reset: "重置",
        optional: "可選",
        required: "此項必填",
        min1: "必須至少為1",
        positive: "必須為正數",
        invalidEmail: "無效的電郵",
        dateNotFuture: "日期最多只能是今天",
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;