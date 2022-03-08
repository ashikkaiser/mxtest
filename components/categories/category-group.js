import styled from '@emotion/styled'
import Item from './item'
import _ from "lodash";

const CategoryGroup = ({item, ...restProps}) => {
	return (
		item.subCategoryInfo.length > 0 && (
			<Main {...restProps}>
				<h4 className="list-title mb-4">
					{item.name} <span/>
				</h4>
				<CategoryWrapper>
					{_.map(item.subCategoryInfo, (value, index) => (
						<Item key={index} item={value}/>
					))}
				</CategoryWrapper>
			</Main>
		)
	)
}

export default CategoryGroup
const Main = styled.div`
  margin-bottom: 50px !important;

  &:last-child {
    margin-bottom: 0;
  }
`
const CategoryWrapper = styled.div`
  & > div {
    &:last-child {
      margin-bottom: 0;
    }
  }
`
