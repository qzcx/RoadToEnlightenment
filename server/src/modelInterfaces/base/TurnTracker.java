package modelInterfaces.base;

/**
 * Created by Jon George on 3/13/14.
 */
public interface TurnTracker {

    public final static String ROLLING = "rolling";
    public final static String PLAYING = "playing";
    public final static String DISCARDING = "discarding";
    public final static String ROBBING = "robbing";
    public final static String FIRST_ROUND = "firstround";
    public final static String SECOND_ROUND = "secondround";

	public abstract void setCurrentTurn(int currentTurn);

	public abstract int getCurrentTurn();

	public abstract void setStatus(String status);

	public abstract String getStatus();
}
