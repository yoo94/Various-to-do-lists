import Button from "./Button";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { viewActive, viewAll, viewCompleted } from "../features/visibilityFilter/visibilityFilterSlice";


const Filter = () => {
  const visibleFilter = useAppSelector(state => state.visibilityFilter);
  const filterDispatch = useDispatch()
  const allFilter = () => {
    filterDispatch(viewAll())
  }
  const activeFilter = () => {
    filterDispatch(viewActive())
  }
  const completedFilter = () => {
    filterDispatch(viewCompleted())
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