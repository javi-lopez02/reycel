import moment from "moment";

const FormatDate = ({ date }: {date: string}) => {
  return <>{moment(date).fromNow()}</>;
};

export default FormatDate;