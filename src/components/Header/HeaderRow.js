import clsx from "clsx";
import PropTypes from "prop-types"; // ES6
import styles from "./HeaderRow.module.scss";
import SearchBar from "./SearchBar";

import { useContext } from "react";
import { TypeDataContext } from "../../lib/typeDataContext";
import { HEPSI_ID, SEARCH_AT } from "../../utils/constants";

const FilterRow = ({ filter, setFilter, hasDataObj }) => {
  const { data: typeData } = useContext(TypeDataContext);

  const newButtonList = [
    {
      label: "Hepsi",
      click: () => setFilter(HEPSI_ID),
      selected: filter === HEPSI_ID,
    },
    ...typeData.map((item) => ({
      label: item.name,
      click: () => setFilter(item.id),
      selected: filter === item.id,
      disabled: !hasDataObj.find((data) => data.typeId === item.id)?.hasData,
    })),
  ];

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterFlex}>
        {newButtonList.map((item) => {
          const { label, click, selected } = item;
          return (
            <button
              key={label}
              className={clsx(styles.filterButton, {
                [styles.buttonDisabled]: item.disabled,
                [styles.selected]: selected,
              })}
              type="button"
              onClick={click}
              disabled={item.disabled || false}
            >
              {label?.split(" ").map((word, i) => (
                <>
                  <span key={word}>{word}</span>
                  {i !== label.split(" ").length - 1 && <br />}
                </>
              ))}
            </button>
          );
        })}

        <div className={styles.filterIconWrapper}>
          <img
            className={styles.filterSvg}
            src="/icons/filter-icon.svg"
            alt="filter-icon"
          />
        </div>
      </div>
    </div>
  );
};

FilterRow.propTypes = {
  filter: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  hasDataObj: PropTypes.object.isRequired,
};

const HeaderRow = ({
  searchAt,
  setSearchAt,
  filter,
  setFilter,
  searchBarVal,
  setSearchbarVal,
  hasDataObj,
}) => {
  const setHarita = () => setSearchAt(SEARCH_AT.HARITA);
  const setListe = () => setSearchAt(SEARCH_AT.LISTE);

  return (
    <div>
      <div className={styles.flex}>
        <div className={styles.toggleGroup}>
          <button
            className={clsx(styles.searchButton, {
              [styles.selected]: searchAt === SEARCH_AT.HARITA,
            })}
            type="button"
            onClick={setHarita}
          >
            Haritada
          </button>
          <button
            className={clsx(styles.searchButton, {
              [styles.selected]: searchAt === SEARCH_AT.LISTE,
            })}
            type="button"
            onClick={setListe}
          >
            Listede
          </button>
        </div>
        <SearchBar
          searchBarVal={searchBarVal}
          setSearchBarVal={setSearchbarVal}
        />
      </div>
      <div className={styles.filterNextRowWrapper}>
        <FilterRow
          filter={filter}
          setFilter={setFilter}
          hasDataObj={hasDataObj}
        />
      </div>
    </div>
  );
};

HeaderRow.propTypes = {
  searchAt: PropTypes.string.isRequired,
  setSearchAt: PropTypes.func.isRequired,
  filter: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  searchBarVal: PropTypes.string.isRequired,
  setSearchbarVal: PropTypes.func.isRequired,
  hasDataObj: PropTypes.object.isRequired,
};

export default HeaderRow;
