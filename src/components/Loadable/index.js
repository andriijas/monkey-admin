import PropTypes from "prop-types";
import Loadable from "react-loadable";
import { ModuleLoading } from "components/Loading";

const LoadableWrapper = props =>
  Loadable({
    timeOut: 10000, //10 seconds
    loading: ModuleLoading,
    ...props,
  });

LoadableWrapper.propTypes = {
  /** Function that returns import() promise to load */
  loader: PropTypes.func.isRequired,
  /** By default Loadable will render the default export of the returned module. If you want to customize this behavior you can use the render option.
   * https://github.com/thejameskyle/react-loadable#customizing-rendering
   */
  render: PropTypes.func,
  /** Timing out when the loader is taking too long. */
  timeOut: PropTypes.number,
  /** The component that acts as loading placeholder (the spinner) */
  loading: PropTypes.func,
};

export default LoadableWrapper;
