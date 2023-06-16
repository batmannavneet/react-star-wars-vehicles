import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Space } from "antd";

const disabledColour: string = "#808080";
const enabledColour: string = "#0000FF";

interface Props {
  pagination: number[];
  totalCount: number;
  prevUrl: string;
  nextUrl: string;
  fetchData: (value: string) => void;
}

const DataTablePaginationFooter: React.FC<Props> = (props) => {
  return (
    <div>
      <Space>
        {props.pagination[0]} - {props.pagination[1]} of {props.totalCount}
        <LeftOutlined
          onClick={() =>
            props.prevUrl != null && props.fetchData(props.prevUrl)
          }
          style={
            props.prevUrl != null
              ? { color: enabledColour }
              : { color: disabledColour }
          }
        />
        <RightOutlined
          onClick={() =>
            props.nextUrl != null && props.fetchData(props.nextUrl)
          }
          style={
            props.nextUrl != null
              ? { color: enabledColour }
              : { color: disabledColour }
          }
        />
      </Space>
    </div>
  );
};

export default DataTablePaginationFooter;
