import * as React from "react";
import { connect } from "react-redux";

import { RootState } from "../store/configureStore";
import Search from "./Search";

const SavedTableHeader: React.SFC = () => (
  <thead>
    <tr>
      <th scope="col">Module Name</th>
      <th scope="col">MCs</th>
      <th scope="col">Grade</th>
    </tr>
  </thead>
);

const mapStateToProps = (state: RootState) => ({
  savedModules: state.savedModules,
});

class SavedTable extends React.Component {
  public render() {
    return (
      <table className="table">
        <SavedTableHeader />
        <tbody>
          <tr>
            <td>
              <Search />
            </td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps)(SavedTable);
