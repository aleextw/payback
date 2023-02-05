import axios from 'axios';

export async function postImageData(data) {
    // await fakeNetwork();
    // return {
    //     documentName: "",
    //     people: [],
    //     items: [
    //         ["Rice", 3, []],
    //         ["Yuzu Chawanmushi", 7, []],
    //         ["Sashimi", 10, []],
    //     ],
    //     serviceCharge: 10, 
    //     gst: 9, 
    //     isServiceCharge: true, 
    //     isGst: true
    // }
    return axios.post('http://localhost:8000/api/receipt_cv', data);
}

export async function postReceiptData(data) {
    // await fakeNetwork();
    // return {
    //     id: "1"
    // };
    return axios.post('http://localhost:8000/api/create', data).then((response) => response.data);
}

export async function getReceiptData(id) {
    // await fakeNetwork();

    // if (id !== "1") {
    //     return null;
    // }
    // return {
    //     documentName: "Groceries",
    //     people: ["Alex", "Joshua", "Booboo"], 
    //     items: [
    //         ["Milk", 2.99, [true, false, false]],
    //         ["Bread", 3.99, [false, true, false]], 
    //         ["Eggs", 4.99, [false, false, true]]]
    //     , 
    //     serviceCharge: 10, 
    //     gst: 9,
    //     isServiceCharge: false, 
    //     isGst: true
    // };


    return axios.get(`http://localhost:8000/api/receipts/${id}`).then((response) => response.data);
}

async function fakeNetwork() {
    // return new Promise((resolve) => setTimeout(resolve, Math.random() * 800));
    return new Promise((resolve) => setTimeout(resolve, 5000));
}