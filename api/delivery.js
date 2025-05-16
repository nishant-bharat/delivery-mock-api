module.exports = function handler(req, res) {
    const { pincode = "" } = req.query;

    if (!pincode || pincode.length < 6) {
        return res.status(400).json({ error: "Invalid or missing pincode." });
    }

    const prefix = pincode.slice(0, 1);
    const regionMap = {
        "1": "North",
        "2": "North",
        "3": "West",
        "4": "West",
        "5": "South",
        "6": "South",
        "7": "East",
        "8": "East",
        "9": "APS",
    };

    const region = regionMap[prefix] || "Unknown";
    const deliveryDate = new Date();

    const baseOffsetMap = {
      "1": 2,
      "2": 3,
      "3": 1,
      "4": 4,
      "5": 2,
      "6": 5,
      "7": 3,
      "8": 6
    };

    const baseOffset = baseOffsetMap[prefix] ?? 3;

    const randomOffset = Math.floor(Math.random() * 5);

    const daysToAdd = baseOffset + randomOffset;

    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

    const formattedDate = deliveryDate.toISOString();

    return res.status(200).json({
        status: "success",
        requestId: "DELH-" + Math.random().toString(36).substring(2, 10),
        timestamp: new Date().toISOString(),
        region: region,
        deliveryInfo: {
            pincode: pincode,
            estimate: {
                estimatedDeliveryDate: formattedDate
            },
            carrier: "Courier Express"
        }
    });
}
