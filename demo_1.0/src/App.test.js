import renderer from 'react-test-renderer';
import Home from '../src/Home';

test('renders learn react link', () => {
    const component = renderer.create(<Home/>,);

});
