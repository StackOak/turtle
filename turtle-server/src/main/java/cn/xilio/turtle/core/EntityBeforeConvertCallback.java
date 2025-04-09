package cn.xilio.turtle.core;

import org.reactivestreams.Publisher;
import org.springframework.data.r2dbc.mapping.event.BeforeConvertCallback;
import org.springframework.data.relational.core.sql.SqlIdentifier;

//@Component
public class EntityBeforeConvertCallback implements BeforeConvertCallback<Object> {


    @Override
    public Publisher<Object> onBeforeConvert(Object entity, SqlIdentifier table) {
        System.out.println(entity);
        return null;
    }
}
