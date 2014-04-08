package model.base;

import model.JsonImpl;

/**
 * Created by: film42 on: 3/7/14.
 */
public class TurnTrackerImpl extends JsonImpl implements modelInterfaces.base.TurnTracker {

    private String status;
    private int currentTurn;

    public TurnTrackerImpl() {
        status = "firstround";
        currentTurn = 0;
    }

    @Override
	public String getStatus() {
        return status;
    }

    @Override
	public void setStatus(String status) {
        this.status = status;
    }

    @Override
	public int getCurrentTurn() {
        return currentTurn;
    }

    @Override
	public void setCurrentTurn(int currentTurn) {
        this.currentTurn = currentTurn;
    }
}
