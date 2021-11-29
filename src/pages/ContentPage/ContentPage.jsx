import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  VerticalNav,
  ContentHeader,
  HeaderUser,
  Input,
  Form,
  ContentError,
  ContentWrapper,
  HeaderUserModal,
  ModalPortal,
} from '../../components/index';
import styles from './ContentPage.module.css';
import SearchIcon from '../../assets/svg/loupe.svg';
import MediaPlayer from '../../components/MediaPlayer/MediaPlayer';
import ClearIcon from '../../assets/svg/delete.svg';
import ContentPageRouting from '../../router/ContentPageRouting';
import { closeModal } from '../../redux/actions/uiStateAction';

const ContentPage = ({
  name,
  isError,
  textError,
  role,
  isOpen,
  typeModal,
  closeModalWindow,
}) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const location = useLocation();
  const contentWrapperRef = React.createRef();

  useEffect(() => {
    if (location.pathname === '/search') {
      const searchInput = document.getElementById('search');
      searchInput.focus();
    }
    return () => {
      setValue('');
    };
  }, [location.pathname]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const skipNav = (key) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      key.preventDefault();
      contentWrapperRef.current.focus();
      setIsFocus(true);
      return;
    }
    setVisible(false);
  };

  const handleClear = () => setValue('');

  return (
    <div
      onClick={() => {
        if (isOpen) closeModalWindow();
      }}
      role='presentation'
      className={`${styles.wrapperContent} fullscreen`}
    >
      <VerticalNav
        onKeyDown={(key) => skipNav(key)}
        setVisible={setVisible}
        visible={visible}
      />
      <div className={styles.contentWrapper}>
        <ContentHeader>
          <div style={{ flex: '0 1 30rem' }}>
            {location.pathname === '/search' && (
              <Form role='search' legend='Поиск песен, подкастов, музыкантов'>
                <Input
                  label='Поиск подкастов, музыки'
                  id='search'
                  value={value}
                  onChange={handleChange}
                  type='search'
                  preIcon={<SearchIcon />}
                  placeholder='Исполнитель, трек или подкаст'
                  clearIcon
                  onClick={handleClear}
                  autoComplete='off'
                  secondIcon={value.length ? <ClearIcon /> : null}
                />
              </Form>
            )}
          </div>
          <HeaderUser role={role} name={name} />
          {isOpen && typeModal === 'headerUser' && (
            <ModalPortal>
              <HeaderUserModal title='Админка' href='http://localhost:8000/' />
            </ModalPortal>
          )}
        </ContentHeader>
        <ContentWrapper
          onBlur={() => setIsFocus(false)}
          isFocus={isFocus}
          ref={contentWrapperRef}
        >
          {isError && <ContentError title={textError} />}
          <ContentPageRouting value={value} />
        </ContentWrapper>
      </div>
      <MediaPlayer />
    </div>
  );
};

ContentPage.propTypes = {
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  textError: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  typeModal: PropTypes.string.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.authorization.name,
  isError: state.loadingData.isError,
  textError: state.loadingData.textError,
  role: state.authorization.role,
  isOpen: state.uiState.isOpen,
  typeModal: state.uiState.typeModal,
});

const mapDispatchToProps = {
  closeModalWindow: () => closeModal(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
