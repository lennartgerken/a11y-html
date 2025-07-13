export enum ResultType {
    PASSED = "passed",
    VIOLATION = "violation",
    INCOMPLETE = "incomplete",
    INAPPLICABLE = "inapplicable"
}

export enum TagType {
    SUCCESS = "success",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    INACTIVE = "inactive"
}

export enum RuleType {
    ANY = "any",
    ALL = "all",
    NONE = "none",
}

export enum Impact {
    MINOR = "minor",
    MODERATE = "moderate",
    SERIOUS = "serious",
    CRITICAL = "critical"
}