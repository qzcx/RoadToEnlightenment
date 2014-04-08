package modelInterfaces.base;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Deck {

    public static final String YEAR_OF_PLENTY= "yearOfPlenty";
    public static final String MONOPOLY= "monopoly";
    public static final String SOLDIER= "soldier";
    public static final String ROAD_BUILDING = "roadBuilding";
    public static final String MONUMENT= "monument";
    public static final String INVALID_DECK = "invalid";

    public static final String[] TYPES = {YEAR_OF_PLENTY, MONOPOLY, SOLDIER, ROAD_BUILDING, MONUMENT};


    public abstract Deck clone();

	public abstract void setMonument(int newMonument);

	public abstract int getMonument();

	public abstract void setRoadBuilding(int newRoadBuilding);

	public abstract int getRoadBuilding();

	public abstract void setSoldier(int newSoldier);

	public abstract int getSoldier();

	public abstract void setMonopoly(int newMonopoly);

	public abstract int getMonopoly();

	public abstract void setYearOfPlenty(int newYearOfPlenty);

    void initBank();

    public abstract int getYearOfPlenty();

    public abstract int getDeckCount();

    public abstract String getDevCard();

}
