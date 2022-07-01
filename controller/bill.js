const Bill = require("../models/bill");



exports.createBill = async (req, res) => {
  try {
    const newBill = await new Bill(req.body).save();
    res.json(newBill);
  } catch (err) {
    console.log(err);
    res.json({ err: err.message });
   
  }
};
exports.getBills= async (req, res) => {
  const billList = await Bill.find({}).sort({ createdAt: -1 }).exec();
  res.json(billList);
};

exports.removeBills = async (req, res) => {
   
  try {
    let deletedBills = await Bill.findOneAndRemove({
      _id: req.params._id,
    }).exec();
   
    console.log(deletedBills)
    res.json(deletedBills);
  } catch (err) {
    return res.json("product delete error");
  }
};

exports.updateBill = async (req, res) => {
  try {
  
    let updateBills= await Bill.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      req.body,
      { new: true }
    ).exec();
    console.log(updateBills);
    res.json(updateBills);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Bill update failed");
  }
};

exports.getBillList = async (req, res) => {
  try {
    console.log(req.body)
    const { sort,  page } = req.body;
    const currentPage = page || 1;
    const perPage = 10;
    const bills = await Bill.find({})
      .skip((currentPage - 1) * perPage)
     
      .sort([[sort]])
      .limit(perPage)
      .exec();
      console.log(bills)

    res.json(bills);
  } catch (err) {
    console.log(err);
  }
};