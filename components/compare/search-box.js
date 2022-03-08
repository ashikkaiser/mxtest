import { BiSearch } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import styled from "@emotion/styled";
import { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import HeaderContext from "../../context/headerContext";
import SearchItem from "./search-item";

const CompareSearch = () => {
	const searchRuf = useRef("");
	const ResultRuf = useRef();
	const overflowRef = useRef();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
	const { searchData, setSearchData, country } = useContext(HeaderContext);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const searchGetHandler = async () => {
			const searchValue = await searchTerm.replace(" ", "%20");
			if (searchTerm.length === 1) {
				const res = await fetch(
					`https://api.spotsaas.com/search?query=${searchValue}`, { headers: { 'country_name': country } }
				)
					.then((response) => response.json())
					.then((responseJSON) => {
						// do stuff with responseJSON here...
						return responseJSON;
					});
				await setSearchResult(res);
			}
		};
		searchGetHandler();

		const delayDebounceFn = setTimeout(() => {

			const searchTimeFilerHandler = async () => {
				const searchValue = await searchTerm.replace(" ", "%20");
				if (searchTerm !== "" && searchResult.length > 0) {
					const res = await fetch(
						`https://api.spotsaas.com/search?query=${searchValue}`, { headers: { 'country_name': country } }
					)
						.then((response) => response.json())
						.then((responseJSON) => {
							// do stuff with responseJSON here...
							return responseJSON;
						});
					await setSearchResult(res);
				}
				/*-------------- search result array -----------------*/
			};
			searchTimeFilerHandler();

		}, 800)
		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm, checked]);

	useEffect(() => {
		const clearSearch = async () => {
			if (searchData.length < 1) {
				/*-------------- search default array -----------------*/
				const defaultArray = await fetch(
					`https://api.spotsaas.com/search?query=sheet`, { headers: { 'country_name': country } }
				)
					.then((response) => response.json())
					.then((responseJSON) => {
						// do stuff with responseJSON here...
						return responseJSON;
					});
				setSearchData(defaultArray);
			}
		};
		clearSearch();
	}, [])

	const SearchHandler = (event) => {
		const data = event.target.value;
		setSearchTerm(data);

	};
	const closeSearchTerm = () => {
		setSearchTerm("");
	};
	const addLayout = () => {
		ResultRuf.current.classList.add("focus");
		overflowRef.current.classList.add("active");
		setChecked(true);
	};
	const closeSearch = () => {
		ResultRuf.current.classList.remove("focus");
		overflowRef.current.classList.remove("active");
	};

	return (
		<div>
			<SearchWrapper>
				<BiSearch className="search-icon" />
				<input
					ref={ResultRuf}
					type="text"
					onClick={addLayout}
					placeholder="Enter product name"
					value={searchTerm}
					onChange={SearchHandler}
				/>
				{searchTerm !== "" && (
					<CloseIcon className="search-close-icon" onClick={closeSearchTerm}>
						<RiCloseLine />
					</CloseIcon>
				)}
				<SearchResultBox ref={ResultRuf}>
					{searchTerm === "" ? (
						<>
							{searchData.map((item, index) => {
								return item.type === "Product" && (
									<SearchItem key={index} closeSearch={closeSearch} item={item} />
								);
							})}
						</>
					) : (
						<>
							{searchResult.length > 0 ? (
								<>
									{searchResult.map((item, index) => {
										return item.type === "Product" && (
											<SearchItem key={index} closeSearch={closeSearch} item={item} />
										);
									})}
								</>
							) : (
								<div className="data-not-found text-center p-4">
									<span> No data found ☹️ </span>
								</div>
							)}
						</>
					)}
				</SearchResultBox>
			</SearchWrapper>
			<Overlay ref={overflowRef} onClick={closeSearch} />
		</div>
	)
}
export default CompareSearch;
const SearchBox = styled.div`
  position: relative;
  margin-bottom: 48px;
  z-index: 10;

  & input {
    width: 100%;
    min-width: 600px;
    border: 2px solid #b0b4c3;
    padding: 8px 15px;
    border-radius: 8px;
    font-size: var(--h4);
    line-height: 35px;
    font-weight: 500;
    font-family: ProximaNovo;
    @media only screen and (max-width: 900px) {
      min-width: 100%;
      font-size: 14px;
    }
    @media only screen and (max-width: 500px) {
      padding: 5px 10px;
      font-size: 14px;
    }
  }

  & input:focus::placeholder {
    color: transparent;
  }
`;
const CloseIcon = styled.div`
  position: absolute;
  right: 120px;
  top: 0;
  height: 60px;
  width: 30px;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: var(--h3);
  cursor: pointer;
  transition: all ease-in-out 200ms;
  color: initial;

  &.search-close-icon {
    right: 15px;
    height: 45px;
  }

  &:hover {
    color: var(--error);
  }

  @media only screen and (max-width: 500px) {
    height: 49px;
    right: 60px;
  }
`;
const Overlay = styled.div`
  position: absolute;

  &.active {
    width: 100%;
    height: 100vw;
    left: 0;
    top: 0;
    z-index: 9;
  }
`;
const SearchResultBox = styled.div`
  opacity: 0;
  visibility: hidden;
  overflow: auto;
  transform: translateY(30px);
  transition: all ease-in-out 300ms;
  position: absolute;
  width: 100%;
  padding: 0 14px;
  max-height: 60vh;
  z-index: 10;
  box-shadow: var(--shadow);
  background: var(--white);
  border-style: solid;
  border-color: var(--lighter);
  border-width: 0 2px 2px 2px;
  border-radius: 8px;
  top: 100%;

  &.focus {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }

  & .data-not-found {
    color: initial;
  }

  & > div {
    border-bottom: 1px solid var(--lighter);

    &:last-of-type {
      border: none;
    }
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10;

  & .search-icon {
    position: absolute;
    color: var(--primary);
    font-size: var(--md-text);
    left: 15px;
    @media (max-width: 900px) {
      left: 10px;
    }
  }

  & input {
    width: 100%;
    padding: 8px 20px 8px 45px;
    border: 2px solid var(--white);
    border-radius: 8px;
    color: var(--primary);
    font-size: 16px;
    font-weight: 400;
    @media only screen and (max-width: 900px) {
      max-width: 320px;
      font-size: 12px;
      line-height: 20px;
      padding: 8px 7px 8px 27px;
    }
    @media only screen and (max-width: 500px) {
      width: 100%;
      padding: 7px 20px 8px 45px;
    }
  }

  input:focus::placeholder {
    color: transparent;
  }
`;