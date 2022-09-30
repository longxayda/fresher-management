import { attendTableOneTraineeSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";
import { useSelector, useDispatch } from "react-redux";

export default function makeData() {
  const attendTableOneTrainee = useSelector(attendTableOneTraineeSelector)
  return attendTableOneTrainee

}
