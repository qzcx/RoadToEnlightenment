package modelInterfaces.map;

import model.map.HexImpl;

import java.util.List;

/**
 * Created by Jon George on 3/13/14.
 */
public interface HexGrid {

    //needed? maybe not...this could just go in getHex since it is never called outside of there....
    Location internalToHexLocation(int x, int y);

    Hex getHex(Location hexLoc);

    List<Hex> getHexesFromVertex(Location hexLocation, Direction direction);

    void addRoad(Location hexLocation, Direction direction, int playerIndex);

    void addSettlement(Location hexLocation, Direction direction, int playerIndex);

    void addCity(Location hexLocation, Direction direction, int playerIndex);

    Location findDesert();

    void randomizeTiles();

    List<List<HexImpl>> getHexes();

    void setHexes(List<List<HexImpl>> hexes);

    List<Integer> getOffsets();

    void setOffsets(List<Integer> offsets);

    int getRadius();

    void setRadius(int radius);

    int getX0();

    void setX0(int x0);

    int getY0();

    void setY0(int y0);
}
