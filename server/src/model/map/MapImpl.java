package model.map;

import comm.moves.form.VertexLocation;
import comm.request.CreateGameRequest;
import model.JsonImpl;
import model.base.ResourcesImpl;
import modelInterfaces.base.Resources;
import modelInterfaces.map.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: film42 on: 3/7/14.
 */
public class MapImpl extends JsonImpl implements modelInterfaces.map.Map, MapAccessor {

    private HexGridImpl hexGrid;
    private int radius;
    private NumbersImpl numbers;
    private List<PortImpl> ports;
    private RobberImpl robber;

    public MapImpl() {
        radius = 0;
        this.robber = new RobberImpl();
        this.numbers = new NumbersImpl();
    }

    public HexGridImpl getHexGrid() {
        return hexGrid;
    }

    @Override
    public void setHexGrid(HexGridImpl hexGrid) {
        this.hexGrid = hexGrid;
    }

    @Override
    public int getRadius() {
        return radius;
    }

    @Override
    public void setRadius(int radius) {
        this.radius = radius;
    }

    @Override
    public NumbersImpl getNumbers() {
        return numbers;
    }

    @Override
    public void setNumbers(NumbersImpl numbers) {
        this.numbers = numbers;
    }

    @Override
    public List<PortImpl> getPorts() {
        return ports;
    }

    @Override
    public void setPorts(List<PortImpl> ports) {
        this.ports = ports;
    }

    @Override
    public Robber getRobber() {
        return robber;
    }

    @Override
    public void setRobber(RobberImpl robber) {
        this.robber = robber;
    }

    @Override
    public void initMap(CreateGameRequest createGameRequest) {
        if(createGameRequest.isRandomTiles()){
            hexGrid.randomizeTiles();
            putRobberOnDesert();
        }
        if(createGameRequest.isRandomNumbers()){
           numbers.randomizeNumberLocations(hexGrid);
        }
        if(createGameRequest.isRandomPorts()){
            this.randomizePorts();
        }
    }

    private void putRobberOnDesert(){
        Location loc = hexGrid.findDesert();
        robber.setX(loc.getX());
        robber.setY(loc.getY());
    }

    @Override
    public void randomizePorts(){
        List<String> typeList = new ArrayList<>();
        for (PortImpl port : ports) {
            if(port.getInputResource() == null){
                typeList.add("");
            }
            else{
                typeList.add(port.getInputResource());
            }
        }

        for (PortImpl port : ports) {
            int index = (int)(Math.random()*(typeList.size()));  //fun fact: Math.random is between [0,1).
            String type = typeList.remove(index);
            if(type.equals("")){
                port.setInputResource(null);
            }
            else{
                port.setInputResource(type);
            }
        }
    }

    @Override
    public void addRoad(int playerIndex, VertexLocation location) {
        String dirEnum = location.getDirection();
        LocationImpl hexLocation = new LocationImpl(location.getX(), location.getY());
        DirectionImpl direction = new EdgeDirection(dirEnum);

        hexGrid.addRoad(hexLocation, direction, playerIndex);
    }

    @Override
    public void addSettlement(int playerIndex, VertexLocation location) {
        String dirEnum = location.getDirection();
        LocationImpl hexLocation = new LocationImpl(location.getX(), location.getY());
        DirectionImpl direction = new VertexDirection(dirEnum);

        hexGrid.addSettlement(hexLocation, direction, playerIndex);
    }

    @Override
    public void addCity(int playerIndex, VertexLocation location) {
        String dirEnum = location.getDirection();
        LocationImpl hexLocation = new LocationImpl(location.getX(), location.getY());
        DirectionImpl direction = new VertexDirection(dirEnum);

        hexGrid.addCity(hexLocation, direction, playerIndex);
    }

    @Override
    public Resources getResourcesAroundVertex(Location hexLocation, Direction direction){
        Resources resources = new ResourcesImpl();
        List<Hex> hexes = hexGrid.getHexesFromVertex(hexLocation, direction);
        for(int i = 0; i < hexes.size(); i++){
            Hex hex = hexes.get(i);
            if(hex.isLand()){
                String land = hex.getLandType();
                if( land != null && !land.equals("Desert") && !land.equals("desert")){
                    resources.incrementResourceByString(land.toLowerCase(), 1);
                }
            }
        }
        return resources;
    }

    @Override
    public List<Resources> getResourcesByNumber(int number){
        List<LocationImpl> locations = numbers.getLocations(number);
        List<Resources> resources = new ArrayList<>();


        resources.add(new ResourcesImpl());
        resources.add(new ResourcesImpl());
        resources.add(new ResourcesImpl());
        resources.add(new ResourcesImpl());
        for (int i = 0; i < locations.size(); i++){
            Hex hex = hexGrid.getHex(locations.get(i));
            String type = hex.getLandType().toLowerCase();
            List<VertexImpl> vertexes = hex.getVertexes();
            for(int j = 0; j < vertexes.size(); j++){
                Vertex vertex = vertexes.get(j);
                VertexValue value = vertex.getValue();
                if(value.getOwnerID() >= 0){
                    Resources rec = resources.get(value.getOwnerID());
                    rec.incrementResourceByString(type, value.getWorth());
                }
            }
        }
        return resources;
    }
}
