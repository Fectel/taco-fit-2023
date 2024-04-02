export default function CartOrderSummaryComponent({ orderItems }) {

    console.log(orderItems)

    function calculateTotal(orderItems) {
        return orderItems.reduce((total, order) => {
            return (
                total +
                order.reduce((orderTotal, item) => {

                    return orderTotal + item.total;
                }, 0)
            );
        }, 0);
    }

    function renderPrice(order){
        console.log(order)
        const price = parseFloat(order.total)
        const price2 = parseInt(order.total)
        console.log(order.total, price, order.total, price2)
        return (
            <span>${price?.toFixed(2)}</span>

        )
    }

    return (
        <div style={{ width: "100%", margin: "auto", fontFamily: "Arial, sans-serif" , color: "black"}}>
            <h2 style={{ textAlign: "center", borderBottom: "2px solid #000", paddingBottom: "5px" }}>
                Order Summary
            </h2>
            {orderItems.map((order) => (
                <div>
                    {console.log(order)}
                    <div>
                        {order.map((ordr, i) => (
                            <div key={i} style={{ marginBottom: "10px" }}>
                                <div  style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem" }}>
                                    <span>{ordr.ingredientName}</span>
                                    <span style={{ marginLeft: "auto", marginRight: "5px" }}>Qty: {ordr.comboAmount}</span>
                                    <span>{renderPrice(ordr)}</span>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            ))}

        </div>
    );
}
