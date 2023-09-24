

const Razorpay = require('razorpay');

// const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env
// Razorpay
var instance = new Razorpay({
    key_id:'rzp_test_uamgEp3sMl3d1Q',
    key_secret:'ZJpB15qzBX6PMpk2UY4DtH6g',
  });


module.exports = {
    razorpayPayment : async ( orderId, totalPrice ) => {
        const id = ""+orderId
        const order = await instance.orders.create({
            amount: totalPrice*100,
            currency: "INR",
            receipt: id
        })
          return order
    }
}
