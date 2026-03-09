import { Error } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function FieldError({ className = "", error = "" }) {
  return (
    <p
      className={`flex flex-row font-dm text-xs font-normal leading-[15px] text-danger ${className} items-center justify-start align-middle`}
    >
      <Error className="mr-[4px]" width={12} height={12} /> {error}
    </p>
  );
}

FieldError.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};
