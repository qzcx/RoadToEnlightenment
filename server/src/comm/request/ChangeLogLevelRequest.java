package comm.request;

/**
 * Created by Jon George on 3/7/14.
 */
public class ChangeLogLevelRequest {
    private String logLevel;

    public ChangeLogLevelRequest(String logLevel) {
        this.logLevel = logLevel;
    }

    public String getLogLevel() {

        return logLevel;
    }
}
