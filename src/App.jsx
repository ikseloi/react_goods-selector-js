import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const Title = ({ selectedGood, clearSelected }) => {
  return (
    <h1 className="title is-flex is-align-items-center">
      {selectedGood === ''
        ? 'No goods selected'
        : `${selectedGood} is selected`}

      {selectedGood && (
        <button
          onClick={clearSelected}
          data-cy="ClearButton"
          type="button"
          className="delete ml-3"
        />
      )}
    </h1>
  );
};

const Button = ({ onClick, dataCy, variant, content }) => {
  return (
    <button
      onClick={onClick}
      data-cy={dataCy}
      type="button"
      className={`button ${variant}`}
    >
      {content}
    </button>
  );
};

const Tr = ({ name, isSelected, onClick, isAnyGoodSelected }) => {
  const removeHandler = () => onClick('');
  const addHandler = () => onClick(name);

  return (
    <tr
      data-cy="Good"
      className={isSelected ? `has-background-success-light` : ''}
    >
      <td>
        {isSelected ? (
          <Button
            onClick={removeHandler}
            dataCy="RemoveButton"
            variant="is-info"
            content="-"
          />
        ) : (
          !isAnyGoodSelected && (
            <Button
              onClick={addHandler}
              dataCy="AddButton"
              variant=""
              content="+"
            />
          )
        )}
      </td>

      <td
        data-cy="GoodTitle"
        className="is-vcentered"
      >
        {name}
      </td>
    </tr>
  );
};

export const App = () => {
  const [selectedGood, setSelectedGood] = useState('Jam');
  const clearSelected = () => setSelectedGood('');
  const selectGood = name => setSelectedGood(name);

  return (
    <main className="section container">
      <Title
        selectedGood={selectedGood}
        clearSelected={clearSelected}
      />

      <table className="table">
        <tbody>
          {goods.map(good => {
            return (
              <Tr
                key={good}
                name={good}
                isSelected={selectedGood === good}
                isAnyGoodSelected={Boolean(selectedGood)}
                onClick={selectGood}
              />
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
