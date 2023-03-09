from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)
CORS(app, support_credentials=True)


engine = create_engine('sqlite:///findings.db')
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

class GroupedFinding(Base):
    __tablename__ = 'grouped_findings'
    id = Column(Integer, primary_key=True)
    grouping_type = Column(String(11))
    grouping_key = Column(String)
    severity = Column(String(8))
    grouped_finding_created = Column(DateTime)
    sla = Column(DateTime)
    description = Column(String)
    security_analyst = Column(String)
    owner = Column(String)
    workflow = Column(String)
    status = Column(String(11))
    progress = Column(Float)
    raw_findings = relationship('RawFinding', backref='grouped_finding')

class RawFinding(Base):
    __tablename__ = 'raw_findings'
    id = Column(Integer, primary_key=True)
    source_security_tool_name = Column(String)
    source_security_tool_id = Column(String)
    source_collbartion_tool_name = Column(String)
    source_collbartion_tool_id = Column(String)
    severity = Column(String(8))
    finding_created = Column(DateTime)
    ticket_created = Column(DateTime)
    description = Column(String)
    asset = Column(String)
    status = Column(String(11))
    remediation_url = Column(String)
    remediation_text = Column(String)
    grouped_finding_id = Column(Integer, ForeignKey('grouped_findings.id'))

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

@app.route('/findings', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_findings():
    grouped_findings = session.query(GroupedFinding).all()
    return jsonify({'findings': [{'grouping_type': gf.grouping_type, 'grouping_key': gf.grouping_key, 'severity': gf.severity, 'grouped_finding_created': gf.grouped_finding_created, 'sla': gf.sla, 'description': gf.description, 'security_analyst': gf.security_analyst, 'owner': gf.owner, 'workflow': gf.workflow, 'status': gf.status, 'progress': gf.progress, 'raw_findings': [{'source_security_tool_name': rf.source_security_tool_name, 'source_security_tool_id': rf.source_security_tool_id, 'source_collbartion_tool_name': rf.source_collbartion_tool_name, 'source_collbartion_tool_id': rf.source_collbartion_tool_id, 'severity': rf.severity, 'finding_created': rf.finding_created, 'ticket_created': rf.ticket_created, 'description': rf.description, 'asset': rf.asset, 'status': rf.status, 'remediation_url': rf.remediation_url, 'remediation_text': rf.remediation_text} for rf in gf.raw_findings]} for gf in grouped_findings]})

if __name__ == '__main__':
    app.run(port=8000, debug=True)

