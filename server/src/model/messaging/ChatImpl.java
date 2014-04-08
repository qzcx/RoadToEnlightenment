package model.messaging;

import model.JsonImpl;
import model.Model;
import modelInterfaces.messaging.Chat;
import modelInterfaces.messaging.Line;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: film42 on: 3/7/14.
 */
public class ChatImpl extends JsonImpl implements modelInterfaces.messaging.Chat {

    private List<Line> lines;
    public ChatImpl() {

        lines = new ArrayList<>();
        //lines.add(new LineImpl());
        //lines.add(new LineImpl());
        //lines.add(new LineImpl());
        //lines.add(new LineImpl());
    }

    public void addLine(Line line){

        lines.add(line);
    }

    public List<Line> getLines(){

        return lines;
    }
}
