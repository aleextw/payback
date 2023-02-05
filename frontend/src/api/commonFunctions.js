
function addPerson(person, data, setData) {
    setData({
        ...data,
        people: [...data.people, person],
        items: data.items.map((item) => {
            return [item[0], item[1], [...item[2], false]];
        })
    });
}

function updatePerson(personIndex, newName, data, setData) {
    setData({
        ...data,
        people: data.people.map((person, index) => {
            if (index === personIndex) {
                return newName;
            } else {
                return person;
            }
        })
    });
}

function removePerson(personIndex, data, setData) {
    setData({
        ...data,
        people: data.people.filter((_, i) => i !== personIndex),
        items: data.items.map((item) => {
            return [item[0], item[1], item[2].filter((_, i) => i !== personIndex)];
        })
    });
}

function addItem(data, setData) {
    setData({
        ...data,
        items: [...data.items, ["", "", data.people.map(() => false)]]
    });
}

function removeItem(itemIndex, data, setData) {
    setData({
        ...data,
        items: data.items.filter((_, i) => i !== itemIndex)
    });
}

function updateItemName(itemIndex, name, data, setData) {
    setData({
        ...data,
        items: data.items.map((item, i) => {
            if (i === itemIndex) {
                return [name, item[1], item[2]];
            } else {
                return item;
            }
        })
    });
}

function updateItemPrice(itemIndex, price, data, setData) {
    setData({
        ...data,
        items: data.items.map((item, i) => {
            if (i === itemIndex) {
                return [item[0], price, item[2]];
            } else {
                return item;
            }
        })
    });
}

function calculateTotal(data) {
    let total = Array(data.people.length + 1).fill(0);

    let serviceCharge = data.isServiceCharge ? (data.serviceCharge === "" ? 1 : (parseFloat(data.serviceCharge) / 100 + 1)) : 1;
    let gst = data.isGst ? (data.gst === "" ? 1 : (parseFloat(data.gst) / 100 + 1)) : 1;

    data.items.forEach((item) => {
        let divisor = item[2].reduce((a,b) =>  a = a + b , 0 );
        let price = item[1] === "" ? 0 : parseFloat(item[1]);

        if (price > 0) {
            let itemPrice = price * serviceCharge * gst;

            total[0] += itemPrice;
            
            if (divisor > 0) {
                itemPrice /= divisor;
        
                item[2].forEach((person, i) => {
                    if (person) {
                        total[i + 1] += itemPrice;
                    }
                });
            }
        }
    });

    return total;

}

function calculateTax(data) {
    let serviceChargeAmount = Array(data.people.length).fill(0);
    let gstAmount = Array(data.people.length).fill(0);

    let serviceCharge = data.isServiceCharge ? (data.serviceCharge === "" ? 0 : (parseFloat(data.serviceCharge) / 100)) : 0;
    let gst = data.isGst ? (data.gst === "" ? 0 : (parseFloat(data.gst) / 100)) : 0;

    data.items.forEach((item) => {
        let divisor = item[2].reduce((a,b) =>  a = a + b , 0 );
        let price = item[1] === "" ? 0 : parseFloat(item[1]);

        if (divisor > 0 && price > 0) {
            let itemServiceChargeTax = price * serviceCharge / divisor;
            let itemGstTax = price * gst / divisor;
    
            item[2].forEach((person, i) => {
                if (person) {
                    serviceChargeAmount[i] += itemServiceChargeTax;
                    gstAmount[i] += itemGstTax;
                }
            });
        }
    });

    return [
        serviceChargeAmount.map((val) => Math.round((val + Number.EPSILON) * 100) / 100), 
        gstAmount.map((val) => Math.round((val + Number.EPSILON) * 100) / 100)
    ];

}

export { addPerson, updatePerson, removePerson, addItem, removeItem, updateItemName, updateItemPrice, calculateTax, calculateTotal };