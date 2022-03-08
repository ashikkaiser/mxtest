import styled from "@emotion/styled";
import React, {useContext, useEffect, useState} from "react";
import HeaderContext from "../../context/headerContext";
import {useMediaQuery} from "react-responsive";

const Pagination = ({totalCount}) => {
	const {currentPage, setCurrentPage, openSiteLoadingPopup} = useContext(HeaderContext);    // pagination current page number
	const isMobile = useMediaQuery({query: "(max-width: 500px)"});
	const pages = Math.ceil(totalCount / 10);
	//Set number of pages
	const numberOfPages = []
	for (let i = 1; i <= pages; i++) {
		numberOfPages.push(i)
	}
	
	// Array of buttons what we see on the page
	const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
	
	useEffect(() => {
		let tempNumberOfPages = [...arrOfCurrButtons]
		
		let dotsInitial = '...'
		let dotsLeft = '... '
		let dotsRight = ' ...'
		
		if (numberOfPages.length < (6)) {
			tempNumberOfPages = numberOfPages
		} else if (currentPage >= 1 && currentPage <= 3) {
			if (isMobile) {
				tempNumberOfPages = [1, 2, 3, dotsInitial, numberOfPages.length]
			} else {
				tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
			}
		} else if (currentPage === 3) {
			const itemNumber = 3;
			const sliced = numberOfPages.slice(0, itemNumber)
			tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
		} else if (currentPage > 3 && currentPage < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
			const sliced1 = numberOfPages.slice(currentPage - 2, currentPage)                 // sliced1 (5-2, 5) -> [4,5]
			const sliced2 = numberOfPages.slice(currentPage, currentPage + 1)                 // sliced1 (5, 5+1) -> [6]
			tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
		} else if (currentPage > numberOfPages.length - 3) {                 // > 7
			const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4)
			tempNumberOfPages = ([1, dotsLeft, ...sliced])
		} else if (currentPage === dotsInitial) {
			// [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
			// arrOfCurrButtons[3] = 4 + 1 = 5
			// or
			// [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
			// [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
			setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
		} else if (currentPage === dotsRight) {
			setCurrentPage(arrOfCurrButtons[3] + 2)
		} else if (currentPage === dotsLeft) {
			setCurrentPage(arrOfCurrButtons[3] - 2)
		}
		
		setArrOfCurrButtons(tempNumberOfPages)
		setCurrentPage(currentPage)
	}, [totalCount, currentPage])
	
	return (
		<Wrapper>
			<PaginationItems>
				<div>
					<button
						className={`previous_btn`}
						disabled={currentPage === 1 && true}
						onClick={() => {
							setCurrentPage(prev => prev <= 1 ? prev : prev - 1);
							window.scrollTo(0, 250);
							openSiteLoadingPopup();
						}}
					>
						Previous
					</button>
				</div>
				
				{arrOfCurrButtons.map(((item, index) => {
					return <div
						key={index}
						className={`page-item ${currentPage === item ? 'active' : ''}`}
						onClick={() => {
							setCurrentPage(item);
							window.scrollTo(0, 250);
							openSiteLoadingPopup();
						}}
					>
						{item}
					</div>
				}))}
				
				<div>
					<button
						className={`next_btn`}
						disabled={currentPage === numberOfPages.length && true}
						onClick={() => {
							setCurrentPage(prev => prev >= numberOfPages.length ? prev : prev + 1);
							window.scrollTo(0, 250);
							openSiteLoadingPopup();
						}}
					>
						Next
					</button>
				</div>
			</PaginationItems>
		</Wrapper>
	)
}

export default Pagination;
const Wrapper = styled.div`
  margin-top: 40px;
  display: grid;
  justify-content: center;
`;
const PaginationItems = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: 500px) {
    gap: 3px;
  }

  & .hide {
    display: none !important;
  }

  & .page-item {
    line-height: 24px;
    padding: 0 7px;
    border-radius: 4px !important;
    font-family: ProximaNovo, serif;
    font-weight: 500 !important;
    transition: all ease-in-out 300ms;
    cursor: pointer;
    @media (max-width: 500px) {
      font-size: 10px;
    }

    &.active,
    :hover {
      background: var(--primary);
      color: var(--white);
    }
  }

  button:disabled.previous_btn,
  button:disabled.next_btn {
    opacity: 0.6;

    :hover {
      background: transparent;
      color: var(--primary);
    }

  }

  & .previous_btn {
    margin-right: 20px;
    @media (max-width: 500px) {
      margin-right: 10px;
    }
  }

  & .next_btn {
    margin-left: 20px;
    @media (max-width: 500px) {
      margin-left: 10px;
    }
  }

  & .previous_btn,
  .next_btn {
    border: 2px solid var(--primary);
    padding: 2px 11px !important;
    border-radius: 4px;
    font-size: 14px !important;
    line-height: 17px !important;
    color: var(--primary);
    background: transparent;

    @media (max-width: 500px) {
      font-size: 12px !important;
    }

    &:hover {
      background: var(--primary);
      color: var(--white);
    }
  }
`;
