import React, {useState, useRef} from 'react';
import useMobile from "hooks/useMobile";
import { withRouter } from 'react-router';
import PropTypes from "prop-types";
import styles from './style.scss';

const Search = (props) => {
    const {history} = props;
    const isMobile = useMobile();
    const input = useRef();
    const [search, setSearch] = useState('');
    const [fullView, setFullView] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if(!search) return false;
        history.push(`/items?search=${search}`);
    };

    const clear = () => {
        input.current.focus();
        setSearch('');
    };

    const closeFullView = () => {
        input.current.blur();
    };

    return <form className={'header-search' + (fullView ? ' full-view' : '')} onSubmit={submit}>
        <div className='header-search-content'>
            {isMobile && fullView && <button type='button' className='header-search-close-btn' onClick={closeFullView} />}
            <label className='header-search-label'>
                {!fullView && isMobile && <i className='nav-icon-search' />}
                <input ref={input} type="text" className='header-search-input' onFocus={() => setFullView(true)} onBlur={() => setFullView(false)} value={search} onChange={(e) => setSearch(e.target.value)}/>
            </label>
            {isMobile && search !== '' && <button type='reset' className='header-search-clean-btn' onClick={clear}>
                <i className='header-search-clean-icon' />
            </button>}
            <button type='submit' className={'header-search-btn nav-icon-search' + (isMobile ? ' hidden' : '')} />
        </div>
    </form>
};

Search.propTypes = {
    history: PropTypes.object
};

export default withRouter(Search);
