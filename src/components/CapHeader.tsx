import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";

interface ICapHeaderProps {
  totalMcs: number;
  totalGradePoint: number;
  semesterMc: number;
  semesterGradePoint: number;
}

const mapStateToProps = (state: RootState) => {
  const currSem = state.misc.currSemester;
  return {
    totalMcs: state.capCalculator.totalMcs,
    totalGradePoint: state.capCalculator.totalGradePoint,
    semesterMc: state.capCalculator.semesterMcs[currSem],
    semesterGradePoint: state.capCalculator.semesterGradePoint[currSem],
  };
};

const CapHeader: React.FunctionComponent<ICapHeaderProps> = props => {
  const { semesterGradePoint, semesterMc, totalGradePoint, totalMcs } = props;
  return (
    <div className="cap-header">
      <div className="total-cap">
        CAP: {totalGradePoint ? totalGradePoint / totalMcs : "--"}
      </div>
      {semesterGradePoint && semesterMc ? (
        <div className="sem-cap">
          Semester CAP: {semesterGradePoint / semesterMc}
        </div>
      ) : null}
    </div>
  );
};

export default connect(mapStateToProps)(CapHeader);
