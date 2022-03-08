import ShowPageProduct from "../filter/show-page-product";
import ProductsItem from "../products/item";
import Pagination from "../pagination";
import {Col} from "react-bootstrap";
import FilterResultsForm from "../filter/filter-results-form";
import _ from "lodash";

const FilterProducts = ({data}) => {
	return (
		<>
			{!isTablet && (
				<Col lg={3}>
					<FilterResultsForm filter={data}/>
				</Col>
			)}
			<Col xs={12} md={12} lg={9}>
				<ShowPageProduct/>
				{_.map(data.products, (item, index) => {
					return <ProductsItem item={item} key={index}/>
				})}
				<Pagination/>
			</Col>
		</>
	)
}
export default FilterProducts;