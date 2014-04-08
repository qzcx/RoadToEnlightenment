package model.map;

import com.google.gson.annotations.SerializedName;
import model.JsonImpl;
import modelInterfaces.map.Hex;
import modelInterfaces.map.HexGrid;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by: film42 on: 3/19/14.
 */
public class NumbersImpl extends JsonImpl {

    @SerializedName("2")
    private List<LocationImpl> number2;
    @SerializedName("3")
    private List<LocationImpl> number3;
    @SerializedName("4")
    private List<LocationImpl> number4;
    @SerializedName("5")
    private List<LocationImpl> number5;
    @SerializedName("6")
    private List<LocationImpl> number6;
    @SerializedName("8")
    private List<LocationImpl> number8;
    @SerializedName("9")
    private List<LocationImpl> number9;
    @SerializedName("10")
    private List<LocationImpl> number10;
    @SerializedName("11")
    private List<LocationImpl> number11;
    @SerializedName("12")
    private List<LocationImpl> number12;

    public List<LocationImpl> getLocations(int number){
        switch(number){
            case 2:
                return number2;
            case 3:
                return number3;
            case 4:
                return number4;
            case 5:
                return number5;
            case 6:
                return number6;
            case 8:
                return number8;
            case 9:
                return number9;
            case 10:
                return number10;
            case 11:
                return number11;
            case 12:
                return number12;
            default:
                throw new InvalidParameterException("Number not supported");
        }

    }

    public void randomizeNumberLocations(HexGrid hexgrid){
        //From Rules:The 18 number tokens are marked with the numerals “2”
        //through “12.” There is only one “2” and one “12.” There is
        //no “7.”
        //all land has a number except desert

        this.number2 = new ArrayList<>();
        this.number3 = new ArrayList<>();
        this.number4 = new ArrayList<>();
        this.number5 = new ArrayList<>();
        this.number6 = new ArrayList<>();
        this.number8 = new ArrayList<>();
        this.number9 = new ArrayList<>();
        this.number10 = new ArrayList<>();
        this.number11 = new ArrayList<>();
        this.number12 = new ArrayList<>();
        List<List<HexImpl>> hexes = hexgrid.getHexes();
        for(int i = 0; i < hexes.size(); i++){
            List<HexImpl> hexes_2 = hexes.get(i);
            for(int j = 0; j < hexes_2.size(); j++){
                Hex hex = hexes_2.get(j);
                String type = hex.getLandType();
                if(hex.isLand() && type != null && !type.equals("Desert") && !type.equals("desert")){
                    boolean assigned = false;
                    Random r = new Random();
                    while(!assigned){
                        int random = (int)(r.nextInt(11) + 2); //random number between 2 and 12;
                        assert(random >=2 && random <= 12);
                        if(random == 7){
                            continue;
                        }
                        List<LocationImpl> locs = this.getLocations(random);
                        if(random == 2 || random == 12){
                            if(locs.size() == 0){
                                locs.add((LocationImpl)hexgrid.internalToHexLocation(j, i));
                                assigned = true;
                            }
                        }
                        else{
                            if(locs.size() < 2){
                                locs.add((LocationImpl)hexgrid.internalToHexLocation(j, i));
                                assigned = true;
                            }
                        }
                    }

                }
            }
        }

    }

    public NumbersImpl() {
        this.number2 = new ArrayList<>();
        this.number3 = new ArrayList<>();
        this.number4 = new ArrayList<>();
        this.number5 = new ArrayList<>();
        this.number6 = new ArrayList<>();
        this.number8 = new ArrayList<>();
        this.number9 = new ArrayList<>();
        this.number10 = new ArrayList<>();
        this.number11 = new ArrayList<>();
        this.number12 = new ArrayList<>();
    }
}
