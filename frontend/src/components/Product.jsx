const Product = (props) =>{
    const {name, price, plu } = props;

    return (
    <div>
        <h3>{name}</h3>
        <p>{price}</p>
        <p>{plu}</p>
    </div>
    )
}
export default Product