import styled from "@emotion/styled";
import {Form} from "react-bootstrap";
import {useMediaQuery} from "react-responsive";
import {useContext} from "react";
import HeaderContext from "../../context/headerContext";

const ShowPageProduct = ({
	                         currentPage,
	                         totalProducts,
	                         pageItems,
	                         setSortBy,
                         }) => {
	const isTablet = useMediaQuery({query: "(max-width: 1080px)"});
	const {sortBy, sortByChecked} = useContext(HeaderContext);
	return (
		<MainWrapper>
			<div>
        <span>
          Showing{" "}
	        {totalProducts > 0
		        ? `${
			        currentPage > 1 ? `${currentPage * 10 + 1 - 10}` : currentPage
		        } - ${pageItems < 10 ? totalProducts : currentPage * 10}`
		        : "0 - 0"}{" "}
	        out of {totalProducts}
        </span>
			</div>
			<FilterForm>
				<p>Sort by:</p>
				<Form.Select value={isTablet ? sortByChecked : sortBy} onChange={setSortBy}>
					<option value={`score`}>Score</option>
					<option value={`rating`}>Rating</option>
					<option value={`alphabetical`}>Alphabetical</option>
				</Form.Select>
			</FilterForm>
		</MainWrapper>
	);
};

export const ReviewShowPageProduct = ({
	                                      currentPage,
	                                      totalProducts,
	                                      pageItems,
	                                      onChange,
                                      }) => {
	const {reviewSortBy, reviewSortByChecked} = useContext(HeaderContext);
	const isTablet = useMediaQuery({query: "(max-width: 1080px)"});
	return (
		<MainWrapper>
			<div>
        <span>
          Showing
	        {totalProducts > 0 ? `${currentPage > 1 ? `${currentPage * 10 + 1 - 10}` : currentPage} - ${pageItems < 10 ? totalProducts : currentPage * 10}` : "0 - 0"}
	        out of {totalProducts}
        </span>
			</div>
			<FilterForm>
				<p>Sort by:</p>
				<Form.Select value={isTablet ? reviewSortByChecked : reviewSortBy} onChange={onChange}>
					<option value={``}>Relevance</option>
					<option value={`Highest-Rated`}>Highest-Rated</option>
					<option value={`Lowest-Rated`}>Lowest-Rated</option>
					<option value={`Least-Recent`}>Least-Recent</option>
					<option value={`Most-Recent`}>Most-Recent</option>
				</Form.Select>
			</FilterForm>
		</MainWrapper>
	);
};

export default ShowPageProduct;
const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;

  //& > * {
  //  width: 100%;
  //}
`;
const FilterForm = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: end;
  margin-bottom: 20px;

  & p {
    margin: 0;
  }

  & select {
    width: 166px;
    color: var(--primary);
    font-weight: 600;
    border-radius: 4px;
    border: 2px solid var(--primary);
    line-height: 19px;
    font-size: 14px;
    padding: 4px 39px 4px 12px;

    &:focus {
      box-shadow: var(--shadow);
      border: 2px solid var(--primary);
    }
  }
`;
