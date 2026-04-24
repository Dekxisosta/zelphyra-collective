export const ERROR_MAP = {
  DEFAULT: {
    code: "ERR_500",
    title: "Something went wrong",
    message: "We encountered an unexpected error. Please try again.",
  },
  NOT_FOUND: {
    code: "ERR_404",
    title: "Page not found",
    message: "The resource you are looking for doesn't exist.",
  },
  UNAUTHORIZED: {
    code: "ERR_401",
    title: "Unauthorized",
    message: "You need to be logged in to access this.",
  },
  FETCH_ERROR: {
    code: "ERR_CONNECTION_FAILED",
    title: "Signal Lost",
    message: "Unable to establish a connection to the server. Check your network.",
  },
  EMPTY_RESULT: {
    code: "DATA_NOT_FOUND",
    title: "No Records Located",
    message: "The requested data is missing or has been moved from the database.",
  },
  TIMEOUT: {
    code: "ERR_GATEWAY_TIMEOUT",
    title: "Request Expired",
    message: "The server took too long to respond. The operation has been aborted.",
  }
};