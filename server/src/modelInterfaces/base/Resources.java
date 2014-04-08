package modelInterfaces.base;

import java.util.List;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Resources {

    public static final String WOOD= "wood";
    public static final String SHEEP= "sheep";
    public static final String ORE= "ore";
    public static final String BRICK = "brick";
    public static final String WHEAT= "wheat";
    public static final String[] TYPES = {BRICK, WOOD, SHEEP, WHEAT, ORE};

    void initBank();

    public Resources Clone(Resources r);

    public abstract void setResources(int brick, int wood, int sheep, int wheat, int ore);

	public abstract void setOre(int ore);

	public abstract int getOre();

	public abstract void setWheat(int wheat);

	public abstract int getWheat();

	public abstract void setSheep(int sheep);

	public abstract int getSheep();

	public abstract void setWood(int wood);

	public abstract int getWood();

	public abstract void setBrick(int brick);

	public abstract int getBrick();

    int getResourceCount();

    int getResourceByString(String type);

    List<String> getAvailibleResources();

    void setResourceByString(String type, int amount);

    void incrementResourceByString(String type, int amount);

    void decrementResourceByString(String type, int amount);
}
