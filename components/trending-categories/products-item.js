import Item from "../products/item";
import _ from "lodash";

const ProductsItem = ({item, setItem}) => {
	const getItem = item.products.slice(0, setItem);
	return (
		<>
			{_.map(getItem, (item, index) => (
				<Item item={item} key={index}/>
			))}
		</>
	)
}
export default ProductsItem;