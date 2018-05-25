import React from "react";
import { List, Avatar, Icon, Card } from "antd";

class Posts extends React.Component {
  state = {
    dataSource: [],
    loading: true,
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(r => r.json())
      .then(dataSource =>
        this.setState({
          dataSource,
          loading: false,
        }),
      );
  }

  render() {
    console.log(this.props.match.path);
    const { dataSource, loading } = this.state;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <Card title="Posts" loading={loading}>
        <List
          loading={loading}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={dataSource}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="star-o" text="156" />,
                <IconText type="like-o" text="156" />,
                <IconText type="message" text="2" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar>{item.title.substring(0)}</Avatar>}
                title={item.title}
              />
              {item.body}
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Posts;
