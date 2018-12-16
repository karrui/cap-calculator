import axios from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import './App.css';

import ModuleList from './components/ModuleList';
import Search from './components/Search';

import logo from './logo.svg';

const API_URL_SEM_1 = 'http://api.nusmods.com/2018-2019/1/modules.json';
const API_URL_SEM_2 = 'http://api.nusmods.com/2018-2019/2/modules.json';

const LS_SAVED_MODS = 'savedModules';
const LS_MODULE_BANK = 'moduleBank';

interface IAppState {
  moduleBank: IModule[] | null,
  savedModules: IModule[] | null,
}

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      moduleBank: null,
      savedModules: null,
    };
  }

  public async componentDidMount() {
    const moduleBank = localStorage.getItem(LS_MODULE_BANK);
    const savedModules = localStorage.getItem(LS_SAVED_MODS);

    if (moduleBank) {
      this.setState({ moduleBank: JSON.parse(moduleBank) });
    } else {
      // retrieve module bank from API
      await this.setModules();
    }

    if (savedModules) {
      this.setState({ savedModules: JSON.parse(savedModules) });
    }
  }

  public render() {
    const { savedModules, moduleBank } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Search moduleBank={moduleBank} />
        <ModuleList modules={savedModules} />
      </div>
    );
  }

  private setModules = async () => {
    const sem1ModuleData = await this.getModules(API_URL_SEM_1);
    const sem2ModuleData = await this.getModules(API_URL_SEM_2);

    const uniqModuleData = _.uniqBy(sem1ModuleData.concat(sem2ModuleData), 'ModuleCode');
    localStorage.setItem(LS_MODULE_BANK, JSON.stringify(uniqModuleData));
    this.setState({
      moduleBank: uniqModuleData
    })
  }

  private getModules = async (url: string) => {
    const { data } : {data: object[]} = await axios.get(url);
    const cleanedData: IModule[] = [];
    data.map(module => cleanedData.push(_.pick(module, ['ModuleTitle', 'ModuleCode', 'ModuleCredit'])));
    return cleanedData;
  }
}

export default App;
