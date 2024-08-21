import Button from "./Button";
import { useRecoilState } from "recoil";
import { visibilityFilterState } from "../recoil/atoms/visibilityFilter";

const Filter = () => {
  const [visibleFilter, setVisibleFilter] = useRecoilState(visibilityFilterState);
  const allFilter = () => {
    setVisibleFilter('All');
  }
  const activeFilter = () => {
    setVisibleFilter('Active');
  }
  const completedFilter = () => {
    setVisibleFilter('Completed');
  }
  return (
    <>
      <div>{visibleFilter}</div>
      <div>
        <Button onClickEvent={() => allFilter()}>전체보기</Button>
        <Button onClickEvent={() => activeFilter()}>해야할 일 보기</Button>
        <Button onClickEvent={() => completedFilter()}>완료한 일 보기</Button>
      </div>
    </>
  )
}
export default Filter;