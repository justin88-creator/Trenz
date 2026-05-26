export default async function handler(req, res) {
    const reference = req.query.reference;

    try {
        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const data = await response.json();

        res.status(200).json({
            paymentStatus: data.data.status,
        });
    } catch (error) {
        res.status(500).json({
            error: "Verification failed",
        });
    }
}
