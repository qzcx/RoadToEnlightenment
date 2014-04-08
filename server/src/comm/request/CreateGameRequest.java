package comm.request;

/**
 * Created by Jon George on 3/7/14.
 */
public class CreateGameRequest {
    private boolean randomTiles;
    private boolean randomNumbers;
    private boolean randomPorts;
    private String name;

    public CreateGameRequest(boolean randomTiles, boolean randomNumbers, boolean randomPorts, String name) {
        this.randomTiles = randomTiles;
        this.randomNumbers = randomNumbers;
        this.randomPorts = randomPorts;
        this.name = name;
    }

    public boolean isRandomTiles() {
        return randomTiles;
    }

    public boolean isRandomNumbers() {
        return randomNumbers;
    }

    public boolean isRandomPorts() {
        return randomPorts;
    }

    public String getName() {
        return name;
    }
}
