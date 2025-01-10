import { useState } from "react";

export default function ModalWindow({ isOpen, closeModal }) {
  // Состояние управления видимостью фильтра
  const [filters, setFilters] = useState([]);

  //Список выпадающего меню
  const dropdownOptions = ["Active time", "Power"];
  const dropdownOptionsMore = ["NOT"];

  //Добавление нового фильтра
  const handleAddFilter = () => {
    setFilters([...filters, { id: filters.length, value: "", subFilter: "" }]);
  };

  //кнопка удаления фильтра
  const handleRemoveFilter = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  //Обновление выбранного значения фильтра
  const handleFilterChange = (id, newValue) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, value: newValue } : filter
      )
    );
  };

  const handleSubFilterChange = (id, newValue) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, subFilter: newValue } : filter
      )
    );
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="closeModal">
          <span>Scenario</span>
        </div>
        <div className="content">
          {filters.map((filter) => (
            <div key={filter.id}>
              <select 
                value={filter.value}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              >
                <option value="" disabled>
                  Выбрать
                </option>
                {dropdownOptions.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>

              {filter.value === "Active time" && (
                <>
                  <span className="equal"> = </span>
                  <span className="from">FROM</span>
                  <input
                    type="time"
                    id={`start-time-${filter.id}`}
                    name="time"
                  />
                  <span className="to">TO</span>
                  <input type="time" id={`end-time-${filter.id}`} name="time" />
                </>
              )}
              {filter.value === "Power" && (
                <>
                  <span className="equal"> = </span>
                  <input type="number" id="power" />
                  <span className="percent"> %</span>
                  <span className="from">FROM</span>
                  <input
                    type="time"
                    id={`start-time-${filter.id}`}
                    name="time"
                  />
                  <span className="to">TO</span>
                  <input type="time" id={`end-time-${filter.id}`} name="time" />
                </>
              )}

              {filter.value && (
                <select className="select-power"
                  value={filter.subFilter}
                  onChange={(e) =>
                    handleSubFilterChange(filter.id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    ...
                  </option>
                  {dropdownOptionsMore.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {filter.subFilter === "NOT" && (
                <>
                  <span>FROM</span>
                  <input
                    type="time"
                    id={`start-time-${filter.id}`}
                    name="time"
                  />
                  <span>TO</span>
                  <input type="time" id={`end-time-${filter.id}`} name="time" />
                </>
              )}

              <button onClick={() => handleRemoveFilter(filter.id)} className="closeRow">X</button>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={handleAddFilter}>+ Add rule</button>
          <div className="modal-footer-buttons-right">
            <button>APPLY</button>
            <button onClick={closeModal}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
