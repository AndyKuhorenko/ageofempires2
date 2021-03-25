import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import Technologies from '../Technologies';

import Preloader from '../../Preloader/Preloader';

configure({ adapter: new Adapter() });

const mockStore = createMockStore([createSagaMiddleware()]);

describe('<Technologies /> unit test', () => {
    describe('when store doesn\'t contain technologies', () => {

        const initialState = {
            ageOfEmpires: {
            fetchedData: { 
                civilizations: [],
                structures: [],
                technologies: [],
                units: [],
            },
            addData: [],
            isFetching: false,
            error: null 
            },
            paginations: {
                pageNumber: 1,
                offset: 0,
                pageLimit: 10
            }
        };

        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <Technologies />
            </Provider>
        );
            it('should render preloader', () => {
                expect(wrapper.find(Preloader)).toHaveLength(1);
            });

    });

    describe('when store contains technology', () => {

        const initialState = {
            ageOfEmpires: {
            fetchedData: { 
                civilizations: [],
                structures: [],
                technologies: [{ id: 1, name: 'testLink' }],
                units: [],
            },
            addData: [],
            isFetching: false,
            error: null 
            },
            paginations: {
                pageNumber: 1,
                offset: 0,
                pageLimit: 10
            }
        };
        
        const store = mockStore(initialState);
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <Technologies />
                </Provider>
            </Router>
        );

        it('should render Link', () => {
            expect(wrapper.find('Link')).toHaveLength(1);
        });

    });
    
    describe('when store contains error', () => {

        const initialState = {
            ageOfEmpires: {
            fetchedData: { 
                civilizations: [],
                structures: [],
                technologies: [],
                units: [],
            },
            addData: [],
            isFetching: false,
            error: { message: 'dangerousError' } 
            },
            paginations: {
                pageNumber: 1,
                offset: 0,
                pageLimit: 10
            }
        };
        
        const store = mockStore(initialState);
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <Technologies />
                </Provider>
            </Router>
        );

        it('should render error message', () => {
            expect(wrapper.find('h2').text()).toBe('dangerousError');
        });
        
    });

});