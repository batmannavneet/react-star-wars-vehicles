import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  initialSearchText: string;
  timeInMs: number;
  setState: (value: string) => void;
}

const SearchWithDelay: React.FC<Props> = (props) => {
  const debounce = useDebouncedCallback((newText) => {
    props.setState(newText);
  }, props.timeInMs);

  return (
    <div>
      <input
        placeholder={props.initialSearchText}
        onChange={(e) => debounce(e.target.value)}
      />
    </div>
  );
};

export default SearchWithDelay;
