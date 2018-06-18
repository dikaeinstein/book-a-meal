import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const setup = () => {
  configure({ adapter: new Adapter() });
};

export default setup;
