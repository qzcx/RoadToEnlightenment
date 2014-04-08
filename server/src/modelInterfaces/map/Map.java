package modelInterfaces.map;

import comm.request.CreateGameRequest;
import model.map.HexGridImpl;
import model.map.NumbersImpl;
import model.map.PortImpl;
import model.map.RobberImpl;
import modelInterfaces.base.Resources;

import java.util.List;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Map {
    HexGridImpl getHexGrid();

    void setHexGrid(HexGridImpl hexGrid);

    int getRadius();

    void setRadius(int radius);

    NumbersImpl getNumbers();

    void setNumbers(NumbersImpl numbers);

    List<PortImpl> getPorts();

    void setPorts(List<PortImpl> ports);

    Robber getRobber();

    void setRobber(RobberImpl robber);

    void initMap(CreateGameRequest createGameRequest);

    void randomizePorts();

    public void addRoad(int playerIndex, comm.moves.form.VertexLocation location);

    public void addSettlement(int playerIndex, comm.moves.form.VertexLocation location);

    public void addCity(int playerIndex, comm.moves.form.VertexLocation location);

    Resources getResourcesAroundVertex(Location hexLocation, Direction direction);

    List<Resources> getResourcesByNumber(int number);
}
